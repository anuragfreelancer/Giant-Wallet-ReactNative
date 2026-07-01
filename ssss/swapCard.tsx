// src/components/SwapCard.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useSwap } from './useSwap';
import { ethers } from 'ethers';
import { Percent } from '@uniswap/sdk-core';

export function SwapCard() {
  const { getQuote, swap } = useSwap();
  const [inputValue, setInputValue] = useState<string>("");
  const [quoteOut, setQuoteOut] = useState<string>("");

  const handleQuote = async () => {
    const wei = ethers.utils.parseEther(inputValue);
    const out = await getQuote(wei);
    setQuoteOut(out);
  };

  const handleSwap = async () => {
    const wei = ethers.utils.parseEther(inputValue);
    // example slippage 1%
    const slippage = new Percent(1, 100);
    await swap(wei, slippage);
    // you can refresh balance etc.
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>ETH → UNI Swap</Text>
      <TextInput
        placeholder="ETH amount"
        value={inputValue}
        onChangeText={setInputValue}
        keyboardType="decimal-pad"
        style={{ borderWidth: 1, marginVertical: 8, padding: 8 }}
      />
      <Button title="Get Quote" onPress={handleQuote} />
      {quoteOut ? <Text>Estimated UNI: {quoteOut}</Text> : null}
      <Button title="Swap" onPress={handleSwap} />
    </View>
  );
}
