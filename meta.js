<script>
  document.addEventListener("DOMContentLoaded", () => {
    const connectWalletButton = document.querySelector(".bg-blue-600");
    
    // Check if MetaMask is installed
    if (typeof window.ethereum !== "undefined") {
      connectWalletButton.addEventListener("click", async () => {
        try {
          // Request account access
          const accounts = await ethereum.request({ method: "eth_requestAccounts" });
          
          // Display the connected account
          connectWalletButton.textContent = Connected: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)};
          connectWalletButton.classList.add("bg-green-600");
          connectWalletButton.classList.remove("bg-blue-600");
        } catch (error) {
          console.error("User denied wallet connection", error);
        }
      });

      // Listen for account changes
      ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          connectWalletButton.textContent = Connected: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)};
        } else {
          connectWalletButton.textContent = "Connect Wallet";
          connectWalletButton.classList.add("bg-blue-600");
          connectWalletButton.classList.remove("bg-green-600");
        }
      });
    } else {
      connectWalletButton.textContent = "Install MetaMask";
      connectWalletButton.addEventListener("click", () => {
        window.open("https://metamask.io/download.html", "_blank");
      });
    }
  });
</script>