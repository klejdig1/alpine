import {useMutation, useQueryClient} from "@tanstack/react-query";
import {login as loginApi, loginDemoUser as loginDemoApi} from "../../services/apiAuth.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useDarkMode} from "../../context/DarkModeContext.jsx";

export function useLogin(){
    const navigate=useNavigate();
    const queryClient=useQueryClient();
    const {isDarkMode} = useDarkMode();

    const {mutate:login, isLoading: isLoggingIn}=useMutation({
        mutationFn:({email, password})=>loginApi({email,password}),
        onSuccess:(user)=>{
            queryClient.setQueryData(['user'],user.user)
            navigate('/dashboard',{replace:true})
        },
        onError:error => {
            console.log('ERROR',error)
            toast.error(error.message || 'Provided email or password are incorrect!',{
                style:{
                    color:isDarkMode ? 'black':'',
                }
            })
        }
    });

    const {mutate:loginDemo, isLoading: isLoggingInDemo} = useMutation({
        mutationFn: loginDemoApi,
        onSuccess:(user)=>{
            queryClient.setQueryData(['user'], user.user);
            toast.success("Welcome! Entered as Demo Reviewer 🚀");
            navigate('/dashboard', {replace: true});
        },
        onError: () => {
            toast.error("Could not start demo session");
        }
    });

    return{login, loginDemo, isLoading: isLoggingIn || isLoggingInDemo}
}
