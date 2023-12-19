"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import {
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Text,
    Title,
} from "@tremor/react";
import { Users } from "@/types";


const TableComponent = () => {

    const [users, setUsers] = useState<Users[]>([])

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get('/api/users')
                setUsers(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getUsers()
    }, [])
    console.log(users)
    return (
        <Card className="w-1/2">
            <Title>List of Users</Title>
            <Table className="mt-5">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Username</TableHeaderCell>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Hierarchy</TableHeaderCell>
                        <TableHeaderCell>Last Login</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item.username}</TableCell>
                            <TableCell>
                                <Text>{item.name}</Text>
                            </TableCell>
                            <TableCell>
                                <Text>{item.hierarchy}</Text>
                            </TableCell>
                            <TableCell>
                                <Text>{item.lastLogin}</Text>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    )
}

export default TableComponent
