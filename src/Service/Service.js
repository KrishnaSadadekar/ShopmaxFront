
import axios from "axios";
export const AllProducts = async () => {
    
    return await axios.get(`http://localhost:4000/api/products`).then(
        (response) => {
           
            return response.data

        }, (error) => {

            return error.json;
        }

    );
     
}
