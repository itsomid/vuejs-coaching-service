export default {
    namespaced: true,
    actions: {
        login() {

        },
        async signup(context, payload) {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB6kEichtbiz3Wo7opV-p2JIMbPiYhaIsc',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                })
            })

            const responseData = await response.json()
            if(!response.ok){
                console.log(responseData.error);
                const error = new Error(responseData.error.message || 'Failed to Authenticated')
                throw error;
            }

            console.log(responseData);
            
        }
    },
    getters: {
        userId(state) {
            return state.userId
        }
    }
}