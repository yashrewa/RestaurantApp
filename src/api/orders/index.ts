import { supabase } from "@/src/lib/supabase"
import { useAuth } from "@/src/providers/AuthProvider"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { InsertTables } from '@/src/types'
import { setItem } from "expo-secure-store"



export const useAdminOrderList = ({ archived = false }) => {

    const statuses = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering']
    console.log(statuses)
    return useQuery({
        queryKey: ['orders', { archived }],
        queryFn: async () => {
            const { data, error } = await supabase.from('orders').select('*').in('status', statuses)

            if (error) {
                throw new Error(error.message)
            }
            console.log('DATA THAT IS BEING RETURNED', data)
            return data
        }
    })
}
export const useMyOrderList = () => {
    const { session } = useAuth()
    const userId = session?.user?.id
    console.log('THIS IS USER ID', userId)

    return useQuery({
        queryKey: ['orders', { userId }],
        queryFn: async () => {
            if (userId) {
                console.log('USER IS PRESENT')
                const { data, error } = await supabase.from('orders').select('*').eq('user_id', userId)
                if (error) {
                    throw new Error(error.message)
                }

                return data
            }

        }
    })
}


export const useOrderDetails = (id: number) => {
    return useQuery({
        queryKey: ['orders', id],
        queryFn: async () => {
            const { data, error } = await supabase.from('orders').select('*').eq('id', id).single()
            if (error) {
                throw new Error(error.message)
            }

            return data
        }
    })
}




export const useInsertOrder = () => {

    const user_id = useAuth().session?.user.id

    const queryClient = useQueryClient()
    return useMutation({
        async mutationFn(data: InsertTables<'orders'>) {
            const { data: newOrder, error } = await supabase.from('orders').insert({ ...data, user_id }).select().single()
            if (error) {
                throw new Error(error.message)
            }
            if (newOrder) {
                return newOrder
            }
        },
        async onSuccess() {
            await queryClient.invalidateQueries()
        }
    })
}