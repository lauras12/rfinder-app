import React from 'react';
import AuthCalls from '../Services/Auth_Service';
import RestaurantContext from '../Context';

/* making sure that the res is fully complete */
export default class RegisterForm extends React.Component {
    static contextType = RestaurantContext;

    handleForm = (e) => {
        e.preventDefault();
        const {fullname, username, password} = e.target;

        const newUser = {
            fullname: fullname.value,
            username: username.value,
            password: password.value,
        }

        AuthCalls.postNewUser(newUser)
        .then(user => {
            fullname.value = '';
            username.value =  '';
            password.value = '';
            this.props.onRegisterSuccess()
        })
        .catch(err => {
            this.context.setError(err);
        })
    }



        handleAfterErrorDisplay = () => {
            this.context.resetError();
        }
    
        handleFullNameCleanUp = (e) => {
            e.preventDefault();
            let full_name = e.target;
            if (full_name.value !== null) {
                    full_name.value = '';
                    this.context.resetError();
            }
        }
        handleUserNameCleanUp = (e) => {
            e.preventDefault();
            let user_name = e.target;
            if (user_name.value !== null) {
                    user_name.value = '';
                    this.context.resetError();
            }
        }
    
        handlePasswordCleanUp = (e) => {
            e.preventDefault();
            let password = e.target;
            if (password.value !== null) {
                    password.value = '';
                    this.context.resetError();
            }
        }
    
    render() {
/* register form */
    return (
        <div>
            <div>
                <form  className='auth-form' onSubmit={this.handleForm}>
                    <input  className="form__field form__field3" type='input' id='fullname' placeholder='fullname' onClick={this.handleFullNameCleanUp}/>
                    <br />
                    <input className="form__field form__field3" type='input' id='username' placeholder='username' onClick={this.handleUserNameCleanUp}/>
                    <br/>
                    <input className="form__field form__field3" type='password' id='password' placeholder='password' onClick={this.handlePasswordCleanUp} />
                    <button type='submit'>Submit</button>
                    <button className='login-button' type="reset" onClick={this.handleAfterErrorDisplay}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )
}
}