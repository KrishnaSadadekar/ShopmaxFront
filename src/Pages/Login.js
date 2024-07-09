import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate,useLocation, Link } from "react-router-dom";
function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    console.log('Before CarContext')
    const {login}=useContext(AuthContext);
    const navigate=useNavigate();
    const location = useLocation();
    const [reloadPage, setReloadPage] = useState(false);
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(username,password);
        const loginStatus= await login(username, password);
        
        if(loginStatus==='success')
            {
                
                const redirectTo = location.state?.from?.pathname || '/';
                navigate(redirectTo);
                window.location.reload();
                
            }
            else
            {
                alert("Login failed!")    
            }    

    };
    return (
        <section className="form-07">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="_form_07_main">
                            <div className="row">
                                <div className="col-sm-6 cv-kl-bn">
                                    <div className="_form_07_main_sub_01">
                                        <div className="form-07-head">
                                            <h2>Shopmax!</h2>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</p>
                                        </div>
                                        <div className="form-7-social-media">
                                            <ol>
                                                <li><i className="fa fa-facebook"></i></li>
                                                <li><i className="fa fa-twitter"></i></li>

                                                <li><i className="fa fa-youtube"></i></li>
                                                <li><i className="fa fa-linkedin"></i></li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 cv-kl-bn">
                                    <div className="_pl_nb_df">
                                        <div className="_bg_cs">
                                            <h2>Sign into your account</h2>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label>Enter Your Email</label>
                                                <input type="email" name="email" value={username}  onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Enter Email" required="" aria-required="true"></input>
                                            </div>

                                            <div className="form-group">
                                                <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Enter password" required="" aria-required="true"></input>
                                            </div>

                                            <div className="form-group">

                                                <button type="submit" className="btn btn-primary btn-lg btn-block btn_04">Login</button>

                                            </div>
                                        </form>
                                            <div><Link to={'/signup'}>Register youreself!</Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );

}


export default Login;