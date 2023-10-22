<script>
    import { onMount } from "svelte";
    import { userData } from "../lib/store";
    import { getAllSymbolsAndMaxLeverages } from "../lib/api-handler";

    let key = "";
    let secret = "";
    let isBlocked;
    export let logged;

    async function connectBtnClick() {
        if (isBlocked || key.length < 50 || secret.length < 50) return;
        isBlocked = true;
        const flag = await getAllSymbolsAndMaxLeverages(key, secret);
        if (flag) {
            logged = true;
            userData.key = key;
            userData.secret = secret;
        }
        isBlocked = false;
    }

    onMount(() => {
        isBlocked = false;
    });
</script>

<div class="log-in-container">
    <div class="header">
        <h1>Change leverage and margin mode on Binance Futures</h1>
    </div>
    <div class="header-info">
        <h2>&#9752; It's Free, No Data Collection, Secure.</h2>
        <h3>&#9752; Switching leverage and margin mode for each coin on Binance Futures is now trouble-free.<br>
            &#9752; Use this service to make changes across all coins with a single click.</h3>
        <p>&#9752; May your <b>trading</b> be successful, your mood be uplifted, and your day be fantastic!</p>
    </div>
    <div class="log-in-table">
        <table>
            <tr>
                <td>
                    <label for="key" class="no-select">Key</label>
                    <input name="key" id="key" bind:value={key} disabled={isBlocked}/>
                </td>
            </tr>
            <tr>
                <td style="height: 10px;"></td>
            </tr>
            <tr>
                <td>
                    <label for="secret" class="no-select">Secret</label>
                    <input name="secret" id="secret" bind:value={secret} disabled={isBlocked}/>
                </td>
            </tr>
            <tr>
                <td class="no-select padding-top-15px">
                    <button class="log-in-button" on:click={connectBtnClick} disabled={isBlocked}>{isBlocked ? "Process..." : "Log In"}</button>
                </td>
            </tr>
        </table>
    </div>
    <div class="how-to-info">
        <p><span style="font-size: 16px;">How To:</span><br>
            1) In your API restrictions on <b>Binance</b>, you need to enable "Enable <b>Futures</b>" checkbox.<br>
            2) Enter your API key and secret in the form, then simply click the 'Log In' button.
	</p>
    </div>
    <div class="donate">
        <p>If my service has been helpful to you and you'd like to express your gratitude, I'd greatly appreciate it:</p>
        <p style="margin-top: 20px;">
            <a href="https://www.paypal.com/donate/?hosted_button_id=TE69K2FPETFGQ" target="_blank" title="PayPal Donate"><img src="/paypal-donate-icon.png" alt="Change leverage and margin mode on Binance Futures, PayPal donate button." title="PayPal Donate" width="128" height="64"/></a>
            <a href="https://anomaex.pages.dev/binance-pay-qr.png" target="_blank" title="Binance Pay"><img src="/binance-pay-qr-icon.png" alt="Change leverage and margin mode on Binance Futures, Binance Pay QR." title="Binance Pay" width="128" height="64"/></a>
            <a href="https://send.monobank.ua/jar/8BXNYQZCuR" target="_blank" title="monobank and Google Pay"><img src="/monobank-gpay-icon.png" alt="Change leverage and margin mode on Binance Futures, monobank and Google Pay." title="monobank and Google Pay" width="128" height="64"/></a>
        </p>
    </div>
    <div class="footer">
        <p>Support: 
            <a href="mailto:anomaex@gmail.com" title="Write to Email" ><img src="/email-support-icon.png" alt="Change leverage and margin mode on Binance Futures, email support icon." title="Write to Email" width="26" height="26"/></a>
            <a href="https://t.me/Anomaex" target=”_blank” title="Write to Telegram" ><img src="/telegram-support-icon.png" alt="Change leverage and margin mode on Binance Futures, telegram support icon." title="Write to Telegram" width="26" height="26"/></a>
			<a href="https://github.com/Anomaex/change-leverage-binance" title="Github source code" ><img src="/github-icon.png" alt="Change leverage and margin mode on Binance Futures, GitHub icon." title="Github source code" width="26" height="26"/></a>
        </p>
	</div>
</div>

<style>
    .log-in-container {
        width: 100%;
    }

    .log-in-table {
        width: 100%;
        border-top: 1px solid #c4c4c4;
        border-bottom: 1px solid #c4c4c4;
        padding-top: 30px;
        padding-bottom: 30px;
    }

    .log-in-table table {
        margin: 0 auto;
        width: 500px;
    }
   
    @media (max-width: 500px) {
        .log-in-table table {
            width: 100%;
            padding: 10px;
        }
    }

    input {
        padding: 6px 10px 5px;
        font-size: 16px;
    }

    .log-in-button {
        float: right;
        font-size: 18px;
        padding: 10px 24px 9px;
    }

    .header {
        height: 100%;
        text-align: center;
        background-color: #f0f0f0;
        color: #1e1e1e;
        padding: 10px;
    }

    .header-info {
        padding-top: 30px;
        padding-bottom: 30px;
        padding-left: 50px;
        padding-right: 50px;
    }

    .how-to-info {
        border-bottom: 1px solid #c4c4c4;
        padding-top: 30px;
        padding-bottom: 30px;
        padding-left: 50px;
        padding-right: 50px;
    }

    .donate {
        border-bottom: 1px solid #c4c4c4;
        padding-top: 30px;
        padding-bottom: 30px;
    }

    .donate p {
        text-align: center;
    }

    .footer {
        padding-top: 30px;
        padding-bottom: 30px;
    }

    .footer p {
        text-align: center;
    }

    .footer img {
        vertical-align: middle;
    }
</style>
