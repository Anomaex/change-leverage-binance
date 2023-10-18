<script>
	import { onMount } from "svelte";
	import Symbol from "./Symbol.svelte";
    import { symbols } from "../lib/store";
    import { changeSymbolLeverage, changeSymbolMarginType } from "../lib/api-handler";

    let isBlocked = true;
    export let logged;
    let leverageToAll = 1;
    let marginTypeToAll = "CROSSED";

    function logOutBtnClick() {
        isBlocked = true;
        isBlocked = false;
        logged = false;
    }

    function changeLeverageToAllBtnClick() {
        if (isBlocked || !leverageToAll || leverageToAll < 1 || leverageToAll > 125) return;
        isBlocked = true;
        symbols.forEach(async el => {
            await changeSymbolLeverage(el, leverageToAll);
        });
        setTimeout(() => {
            isBlocked = false;
        }, 5000);
    }

    function changeMarginTypeToAllBtnClick() {
        if (isBlocked || !marginTypeToAll || marginTypeToAll.length > 9) return;
        isBlocked = true;
        symbols.forEach(async el => {
            await changeSymbolMarginType(el.symbol, marginTypeToAll);
        });
        setTimeout(() => {
            isBlocked = false;
        }, 5000);
    }

    onMount(() => {
        isBlocked = false;
    });
</script>

<div class="user-container">
    <table>
        <tr>
            <td class="user-header border-bottom">
                <table>
                    <tr>
                        <td class="fill-td"><p class="no-select" style="padding-left: 20px;">Change leverage and margin mode on Binance Futures.</p></td>
                        <td><button class="no-select" on:click={logOutBtnClick} disabled={isBlocked}>Log Out</button></td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td class="border-bottom">
                <table class="to-all-table">
                    <tr>
                        <td class="txt-left no-select">Change leverage to All</td>
                        <td><input type="number" min="1" max="125" bind:value={leverageToAll}/></td>
                        <td><button class="no-select" on:click={changeLeverageToAllBtnClick} disabled={isBlocked}>Change</button></td>
                    </tr>
                    <tr style="height: 20px;"></tr>
                    <tr>
                        <td class="txt-left no-select">Change margin mode to All</td>
                        <td class="no-select">
                            <select bind:value={marginTypeToAll}>
                                <option value="CROSSED" selected>Cross</option>
                                <option value="ISOLATED">Isolated</option>
                            </select>
                        </td>
                        <td>
                            <button class="no-select" on:click={changeMarginTypeToAllBtnClick} disabled={isBlocked}>Change</button>
                        </td>
                    </tr>
                </table>
                <p style="padding: 5px 20px 40px 20px;">If you have enabled <b>Multi-Assets</b> mode in your account you don't need to change Margin Mode!</p>
            </td>
        </tr>
        <tr>
            <td>
                <table class="list-table">
                    <tr class="no-select">
                        <th>Symbol</th>
                        <th>Margin Mode</th>
                        <th></th>
                        <th>Leverage</th>
                        <th>Max Leverage</th>
                        <th></th>
                    </tr>
                    {#each symbols as symbol}
                        <tr style="height: 20px;"></tr>
                        <Symbol symbol={symbol}/>
                    {/each}
                </table> 
            </td>
        </tr>
    </table>
</div>

<style>
    .user-container {
        width: 100%;
    }

    .user-header {
        height: 30px;
    }

    .border-bottom {
        border-bottom: 1px solid #c4c4c4;
    }

    .fill-td {
        width: 100%;
    }

    .to-all-table {
        text-align: center;
        padding-top: 40px;
        padding-bottom: 5px;
        padding-left: 20px;
        padding-right: 20px;
    }

    .list-table {
        text-align: center;
        padding-top: 40px;
        padding-bottom: 40px;
        padding-left: 20px;
        padding-right: 20px;
    }
</style>
