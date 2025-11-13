const priceDisplay = document.getElementById("price-display")
const dialog = document.querySelector('dialog')

document.querySelector("form").addEventListener('submit', async (e) => {
    e.preventDefault()
    
    try{
        const now = new Date()
        const investmentAmount = parseFloat(document.getElementById("investment-amount").value)
        const pricePerOz = parseFloat(document.getElementById("price-display").textContent)

        const response = await fetch("./api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                transactionTime: now.toISOString(),
                pricePerOz: pricePerOz,
                goldSold: calculateUserPurchasedOz(investmentAmount,pricePerOz),
                investmentAmount: investmentAmount
            })
        })
        const responseData = await response.json()
        if(response.ok){
            document.getElementById('investment-summary').textContent = `You just bought ${responseData.goldSold} ounces (ozt) for £${responseData.investmentAmount}. \n You will receive documentation shortly.`
            dialog.showModal()
            document.getElementById("investment-amount").value = ''
            }
    }catch(err){

    }
})

document.getElementById('ok-btn').addEventListener('click', () => dialog.close())

function calculateUserPurchasedOz(investmentAmount, pricePerOz){
    return Math.round(investmentAmount / pricePerOz * 10000)/10000
}

setInterval(function(){
    const connectionStatus = document.getElementById("connection-status")
    
    if(navigator.onLine){
        connectionStatus.textContent = "Live Price 🟢"
    }else{
        connectionStatus.textContent = "Disconnected 🔴"
    }
    
},100)