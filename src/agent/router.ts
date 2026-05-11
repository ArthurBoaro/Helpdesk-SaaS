// Create types for Intent
export type Intent =
    "STATUS" |
    "SUPPORT" |
    "BILLING" |
    "SMALLTALK" |
    "UNKNOWN"

export function detectIntent(message: string): Intent {

    // Set message to lower case
    const messageLowerCase = message.toLowerCase();
    // Email Regex
    const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
    // List of status keywords
    const statusKeywords = ["status", "fora do ar", "instabilidade", "conectado", "desconectado"];
    // Verify if message contains any status keywords
    const containsStatus = statusKeywords.some(keyword => messageLowerCase.includes(keyword));
    if (containsStatus) {
        return "STATUS"
    }

    // List of support keywords
    const supportKeywords = ["erro", "error", "login", "ajuda", "suporte", "email"];
    // Verify if message contains any support keywords
    const containsSupport = supportKeywords.some(keyword => messageLowerCase.includes(keyword));
    if (containsSupport || emailRegex.test(message)) {
        return "SUPPORT"
    }

    // List of billing keywords
    const billingKeywords = ["faturamento", "faturacao", "faturação", "cobranca", "cobrança", "pagamento"];
    // Verify if message contains any billing keywords
    const containsBilling = billingKeywords.some(keyword => messageLowerCase.includes(keyword));
    if (containsBilling) {
        return "BILLING"
    }

    // List of smalltalk keywords
    const smalltalkKeywords = ["oi", "ola", "olá", "bom dia", "boa tarde", "boa noite"];
    // Verify if message contains any smalltalk keywords
    const containsSmalltalk = smalltalkKeywords.some(keyword => messageLowerCase.includes(keyword));
    if (containsSmalltalk) {
        return "SMALLTALK"
    }

    // Fallback
    return "UNKNOWN"
}
