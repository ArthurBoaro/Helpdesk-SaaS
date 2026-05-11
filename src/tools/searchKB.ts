export function searchKB (query: string) {

    // Create simulated variables
    const messageLowerCase = query.toLowerCase();
    const responses = [];
    // Verify if message contains any support keywords, if has then set the response
    const supportKeywords = ["erro", "error", "login", "resolver", "401"];
    const containsSupport = supportKeywords.some(keyword => messageLowerCase.includes(keyword));
    if (containsSupport) {
        responses.push(
            {
                "title": "Como resolver erro 401 no login", 
                "summary": "Verificar se o nome de usuário e senha estão corretos." 
            }
        );
    }
    // Verify if message contains any reset keywords, if has then set the response
    const resetKeywords = ["resetar", "reset", "senha", "password"];
    const containsReset = resetKeywords.some(keyword => messageLowerCase.includes(keyword));
    if (containsReset) {
        responses.push(
            {
                "title": "Reset de senha", 
                "summary": "Para resetar a sua senha, clique em 'Esqueci minha senha'." 
            }
        );
    }

    return responses;
}