import axios from "axios"




export class API {
    static postImage (round: number, id: string, image: string, username: string) {
        try {
            axios.post(`http://localhost:5000/image`, 
                {
                    image: image,
                    username: username
                },
                {
                    params: { round, id }
                }
            )
        } catch (e) {
            console.log(e)
        }
    }

    static postSentence (sentence: string, round: number, id: string, username: string) {
        try {
            axios.post(`http://localhost:5000/sentence`, 
                {
                    sentence: sentence,
                    username: username
                },
                {
                    params: { round,id }
                }
            )
        } catch (e) {
            console.log(e)
        }
    }
}
