
import axios from "axios";
import { BASE_URL } from "./helper";
export const AllProducts = async () => {
    
    return await axios.get(`${BASE_URL}/api/products`).then(
        (response) => {
           
            return response.data

        }, (error) => {

            return error.json;
        }

    );
     
}
