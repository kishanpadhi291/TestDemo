import React from 'react'
import './detailsPage.scss'
import Card from '@/components/Card/Card'

const page = ({ params }: { params: { id: string } }) => {
    const id = params.id

    return (
        <div className="details">
            <Card>
                <div className="heading">
                    <h2>Details</h2>
                </div>
                <p>Name: 'kishan' 'S' 'Padhi'</p>
                <p>Email: 'kishanpadhi291@gmail.com'</p>
                <p>PhoneNumber: '7096374696'</p>
                <p>Gender: 'Male'</p>
                <p>College: 'Depstar'</p>
                <p>Department: 'IT'</p>
                <p>Department: 'IT'</p>
                <p>Hobbies: '12/07/2024'</p>
                <p>DOB: '12/07/2024'</p>
            </Card>
        </div>
    )
}

export default page
