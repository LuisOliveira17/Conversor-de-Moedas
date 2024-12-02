import React, { useState, useEffect } from "react";
import { Button } from "@/components/Button";
import { useAuth, useUser  } from "@clerk/clerk-expo";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from "react-native";
import { Picker } from '@react-native-picker/picker';

// Função para buscar a cotação das moedas (USD e EUR)
const fetchCurrencyRate = async () => {
  try {
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/BRL");
    const data = await response.json();
    return data.rates; // Retorna as taxas de câmbio
  } catch (error) {
    console.error("Erro ao buscar as taxas de câmbio:", error);
    return null;
  }
};

export default function Home() {
  const { user } = useUser ();
  const { signOut } = useAuth();

  const [valueBRL, setValueBRL] = useState(""); // Valor digitado em reais
  const [rates, setRates] = useState(null); // Taxas de câmbio
  const [selectedCurrency, setSelectedCurrency] = useState("USD"); // Moeda selecionada
  const [convertedValue, setConvertedValue] = useState(0); // Valor convertido
  const [showRatesList, setShowRatesList] = useState(false); // Controle para exibir a lista de taxas

  // Carregar as taxas de câmbio ao carregar o componente
  useEffect(() => {
    const getRates = async () => {
      const ratesData = await fetchCurrencyRate();
      setRates(ratesData);
    };

    getRates();
  }, []);

  // Atualizar o valor convertido sempre que o valor BRL ou a moeda selecionada mudar
  useEffect(() => {
    if (rates && valueBRL) {
      const brlValue = parseFloat(valueBRL);
      if (!isNaN(brlValue)) {
        setConvertedValue(brlValue * rates[selectedCurrency]);
      }
    }
  }, [valueBRL, rates, selectedCurrency]);

  // Função para renderizar a lista de taxas
  const renderRatesList = () => {
    if (!rates || valueBRL === "") return null;

    const brlValue = parseFloat(valueBRL);
    if (isNaN(brlValue)) return null;

    const currencyKeys = Object.keys(rates);
    return (
      <FlatList
        data={currencyKeys}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Text style={styles.rate}>
            {brlValue.toFixed(2)} R$ = {(brlValue * rates[item]).toFixed(4)} {item}
          </Text>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Exibe o nome e imagem do usuário */}
      <Image source={{ uri: user?.imageUrl }} style={styles.image} />
      <Text style={styles.text}>{user?.fullName}</Text>

      {/* Campo para o usuário digitar o valor em reais */}
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Digite o valor em R$"
        placeholderTextColor="#aaaaaa" // Cor do texto do placeholder
        value={valueBRL}
        onChangeText={(text) => setValueBRL(text)}
      />

      {/* Seletor de moeda */}
      <Picker
        selectedValue={selectedCurrency}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
      >
        <Picker.Item label="USD - Dólar Americano" value="USD" />
        <Picker.Item label="EUR - Euro" value="EUR" />
        <Picker.Item label="GBP - Libra Esterlina" value="GBP" />
        <Picker.Item label="JPY - Yen Japonês" value="JPY" />
        <Picker.Item label="AUD - Dólar Australiano" value="AUD" />
        <Picker.Item label="CAD - Dólar Canadense" value="CAD" />
        <Picker.Item label="CHF - Franco Suíço" value="CHF" />
      </Picker>

      {/* Exibe a cotação convertida */}
      {rates ? (
        <View style={styles.ratesContainer}>
          <Text style={styles.ratesTitle}>Conversão para {selectedCurrency}</Text>
          <Text style={styles.rate}>
            R$ {valueBRL} = {convertedValue.toFixed(2)} {selectedCurrency}
          </Text>
        </View>
      ) : (
        <Text style={styles.loading}>Carregando taxas de câmbio...</Text>
      )}
      <Text>{"\n"}</Text> 

      {/* Botão para mostrar a lista de taxas asasdasd*/}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setShowRatesList(!showRatesList)}
      >
        <Text style={styles.buttonText}>Mostrar Taxas de Câmbio</Text>
      </TouchableOpacity>

      {/* Lista de taxas de câmbio */}
      {showRatesList && (
        <View style={styles.ratesListContainer}>
          {renderRatesList()}
        </View>
      )}

      {/* Botão de Sair */}
      <Button icon="exit" title="Sair" onPress={() => signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212", // Cor de fundo escura
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff", // Cor do texto
    marginBottom: 10,
  },
  image: {
    width: 92,
    height: 92,
    borderRadius: 12,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#444", // Cor da borda
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    marginTop: 16,
    backgroundColor: "#1e1e1e", // Cor de fundo do campo de entrada
    color: "#ffffff", // Cor do texto do campo de entrada
  },
  picker: {
    height: 50,
    width: "100%",
    marginTop: 16,
    borderColor: "#444", // Cor da borda
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#1e1e1e", // Cor de fundo do seletor
    color: "#ffffff", // Cor do texto do seletor
  },
  ratesContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#1f1f1f", // Cor de fundo do container de taxas
    alignItems: "center",
  },
  ratesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#bb86fc", // Cor do título
  },
  rate: {
    fontSize: 16,
    color: "#ffffff", // Cor do texto da taxa
  },
  loading: {
    color: "#ffffff", // Cor do texto de carregamento
    marginTop: 20,
  },
  button: {
    backgroundColor: "#000000", // Cor de fundo do botão
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff", // Cor do texto do botão
    fontSize: 16,
  },
  ratesListContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#1f1f1f", // Cor de fundo da lista de taxas
    width: "100%",
  },
});