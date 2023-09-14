import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'Username' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                const res = await axios.get(process.env.SOURCE_URL + "/token/?format=json", {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    auth: {
                        username: credentials.username,
                        password: credentials.password
                    }
                })
                .then(function (result) {                    
                    const user = {id: "1", name: "Admin", email: "admin@gmail.com", jwt: result.data.token}
                    return user
                })
                .catch(function (error) {
                    return null
                })
                return res
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },    
    pages: {
        signIn: "/",      
        error: '/auth/error'
    },   
    callbacks: {        
        async session({ session, token}) {            
            session.id = token.id
            session.jwt = token.jwt
            return Promise.resolve(session)
        },
        async jwt({ token, user}) {            
          if (user) {
            token.id = user.id
            token.jwt = user.jwt
          }            
          return Promise.resolve(token)
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }