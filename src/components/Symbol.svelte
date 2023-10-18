<script>
    import { changeSymbolLeverage, changeSymbolMarginType } from "../lib/api-handler";
	import { onMount } from "svelte";

    export let symbol;
    let isBlocked = true;
    let leverage = 1;
    let marginType = "CROSSED";

    async function changeMarginTypeBtnClick() {
        if (isBlocked || !marginType || marginType.length > 9) return;
        isBlocked = true;
        await changeSymbolMarginType(symbol.symbol, marginType);
        isBlocked = false;
    }

    async function changeLeverageBtnClick() {
        if (isBlocked || !leverage || leverage < 1 || leverage > 125) return;
        isBlocked = true;
        await changeSymbolLeverage(symbol, leverage);
        isBlocked = false;
    }

    function whatSymbol() {
        if (symbol.symbol.includes("USDT")) {
            let pos = symbol.symbol.indexOf("USDT");
            return symbol.symbol.substring(0, pos);
        } else if (symbol.symbol.includes("BUSD")) {
            let pos = symbol.symbol.indexOf("BUSD");
            return symbol.symbol.substring(0, pos);
        } else return symbol.symbol;
    }

    function whatMargin() {
        if (symbol.symbol.includes("USDT"))
            return "USDT";
        else if (symbol.symbol.includes("BUSD"))
            return "BUSD"; 
        else return "";
    }

    onMount(() => {
        isBlocked = false;
    });
</script>

<tr>
    <td class="txt-left">{whatSymbol()}<span style="font-size: 12px; padding-left: 5px;">{whatMargin()}</span></td>
    <td class="no-select">
        <select bind:value={marginType}>
            <option value="CROSSED" selected>Cross</option>
            <option value="ISOLATED">Isolated</option>
        </select>
    </td>
    <td class="no-select">
        <button on:click={changeMarginTypeBtnClick} disabled={isBlocked}>Change</button>
    </td>
    <td>
        <input type="number" min="1" max="{symbol.maxLeverage}" bind:value={leverage}/>
    </td>
    <td>
        {symbol.maxLeverage}
    </td>
    <td class="no-select">
        <button on:click={changeLeverageBtnClick} disabled={isBlocked}>Change</button>
    </td>
</tr>
