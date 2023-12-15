import { URLs, symbols, userData } from "./store";
import { getSignature } from "./hmac-handler";

export async function getAllSymbolsAndMaxLeverages(key, secret) {
    let response = await fetch(URLs.BINANCE_API + URLs.EXCHANGE_INFO);
    if (!response.ok) return false;
    let result = await response.json();
    if (symbols.length > 0)
        symbols.length = 0;
    const newSymbols = [];
    console.log(result.symbols.length);
    for (let i = 0; i < result.symbols.length; i++) {
        const el = result.symbols[i];
        if (el.symbol)
            newSymbols.push(el.symbol);
    }
    newSymbols.sort();
    for (let i = 0; i < newSymbols.length; i++)
        symbols.push({ symbol: newSymbols[i], maxLeverage: 1 });
    let request = "timestamp=" + await getTimestampAsync();
    request += "&signature=" + getSignature(request, secret);
    response = await fetch(URLs.BINANCE_API + URLs.LEVERAGE_BRACKET + '?' + request, {
        method: "GET",
        headers: {
            "Content-Type" : "application/x-www-form-urlencoded",
            "X-MBX-APIKEY" : key
        }
    });
    if (!response.ok) return false;
    result = await response.json();
    for (let i = 0; i < symbols.length; i++) {
        const el = symbols[i];
        const value = result.find(x => x.symbol === el.symbol);
        if (value)
            el.maxLeverage = value.brackets[0].initialLeverage;
    }
    return true;
}

async function getTimestampAsync() {
    if (userData.recvWindow == 0) {
        let response = await fetch(URLs.BINANCE_API + URLs.SERVER_TIME);
        let result = await response.json();
        userData.recvWindow = Math.abs(result["serverTime"] - Date.now());
    }
    return Date.now() - userData.recvWindow;
}

export async function changeSymbolLeverage(element, leverage) {
    const newLeverage = leverage <= element.maxLeverage ? leverage : element.maxLeverage; 
    let request = `symbol=${element.symbol}&leverage=${newLeverage}&timestamp=${await getTimestampAsync()}`;
    request += `&signature=${getSignature(request, userData.secret)}`;
    const response = await fetch(URLs.BINANCE_API + URLs.LEVERAGE, {
        method: "POST",
        headers: {
            "Content-Type" : "application/x-www-form-urlencoded",
            "X-MBX-APIKEY" : userData.key
        },
        body: request
    });
    if (!response.ok) return false;
    return true;
}

export async function changeSymbolMarginType(symbol, marginType) {
    let request = `symbol=${symbol}&marginType=${marginType}&timestamp=${await getTimestampAsync()}`;
    request += `&signature=${getSignature(request, userData.secret)}`;
    const response = await fetch(URLs.BINANCE_API + URLs.MARGIN_TYPE, {
        method: "POST",
        headers: {
            "Content-Type" : "application/x-www-form-urlencoded",
            "X-MBX-APIKEY" : userData.key
        },
        body: request
    });
    if (!response.ok) {
        const result = await response.json();
        console.log(result);
        return false;
    } 
    return true;
}
