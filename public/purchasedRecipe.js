const eventSource = new EventSource("/api/purchasedRecipe")

const priceDisplay = document.getElementById("price-display")

eventSource.onmessage = event => {
    const data = JSON.parse(event.data)
    if (data.event === "pdf-ready"){
        console.log(data.filePath)
        window.open("/" + data.filePath, "_blank")
    }
}

eventSource.onerror = () => {
    console.log("Connection lost. Attempting to reconnect...")
}