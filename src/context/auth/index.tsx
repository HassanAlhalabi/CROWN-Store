import { onAuthStateChanged } from 'firebase/auth';
import { createContext, ReactNode, useState, useEffect } from 'react';
import { auth } from '../../firebase/index';


export const AuthContext = createContext<{
    user: string | null,
    setAuthUser: (user: string | null) => void
}>({
    user: null,
    setAuthUser: () => {}
})

export const AuthProvider = ({children}:{children: ReactNode}) => {

    const [user, setUser] = useState<string | null>(null);

    const setAuthUser = (user: string | null) => setUser(user);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth,(user) => {
            if(user) {
                setUser(user.email);
            }
            setUser(null)
        })
        return unSubscribe;
    });

    return  <AuthContext.Provider value={{user,setAuthUser}}>
                {children}
            </AuthContext.Provider>

}