import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cores } from "@/styles/cores";
import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "@/firebase-config";
import { router } from "expo-router";

export default function Cadastro() {

    const[nome, setNome] = useState('');
    const[email, setEmail] = useState('');
    const[senha, setSenha] = useState('');
    const[confirmarSenha, setConfirmarSenha] = useState('');
    const[erro, setErro] = useState('');
    const[carregando, setCarregando] = useState(false);

    async function handleCadastro() {
        if (!nome.trim() || !email.trim() || !senha) {
            setErro('Por favor, preencha todos os campos.');
            return;
        }
        if (senha !== confirmarSenha) {
            setErro('As senhas não coincidem.');
            return;
        }
        setCarregando(true);

        try {
        const { user } = await createUserWithEmailAndPassword(
            auth,
            email.trim(),
            senha,
        );
        await updateProfile(user, { displayName: nome.trim() });

        // Faz o e-mail de confirmação chegar em português.
        auth.languageCode = "pt-BR";
        await sendEmailVerification(user);

        // `replace` para que "voltar" não traga de novo o formulário de cadastro.
        router.replace("/verificar-email");
            }   catch (e) {
                    setErro("Deu ruim dog");
                }   finally {
                        setCarregando(false);
                    }
        }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>Cadastro</Text>
            <TextInput placeholder="Nome" 
                placeholderTextColor={cores.cinzaClaro}
                value={nome}
                onChangeText={setNome}
                keyboardType="default"
                style={styles.input} />
            <TextInput placeholder="E-mail" 
                placeholderTextColor={cores.cinzaClaro} 
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.input} />
            <TextInput placeholder="Senha" placeholderTextColor={cores.cinzaClaro} secureTextEntry 
                value={senha}
                onChangeText={setSenha}
                keyboardType="default"
                style={styles.input} />
            <TextInput placeholder="Confirmar Senha" placeholderTextColor={cores.cinzaClaro} secureTextEntry 
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                keyboardType="default"
                style={styles.input} />
                
            {erro ? <Text style={styles.erro}>{erro}</Text> : null}
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.botao}
                disabled={carregando}
                onPress={handleCadastro}
            >
            {carregando ? (
            <ActivityIndicator color={cores.branco} />
            ) : (
            <Text style={styles.textoBotao}>Cadastrar</Text>
            )}
      </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f6f8fa",
        alignItems: "center",
        justifyContent: "center",
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        color: cores.preto,
    },
    input: {
        backgroundColor: cores.branco,
        borderColor: cores.cinzaClaro,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        width: "80%",
    },
    erro: {
        color: "red",
        marginBottom: 10,
    },
    botao: {
        backgroundColor: cores.verde,
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: "80%",
        alignItems: "center",
    },
    textoBotao: {
        color: cores.branco,
        fontSize: 16,
        fontWeight: "bold",
    },
});
