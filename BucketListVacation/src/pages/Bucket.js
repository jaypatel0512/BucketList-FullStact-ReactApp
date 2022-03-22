import { useEffect, useState } from "react";
import axios from "axios";

function Bucket() {
    const [buckets, setBuckets] = useState([]);

    const sendGetRequest = async () => {
        try {
            let token = localStorage.getItem('token');

            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            };

            const response = await axios.get(
                'http://localhost:8000/api/buckets/',
                config
            );
            setBuckets(response.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        sendGetRequest();
    }, []);
    return (
        <div className="py-20 h-screen bg-gray-100">
            <div className="">
                <div className='grid grid-cols-2'>
                    {buckets.map((item) => (
                        <CarCard bucket={item} key={item.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Bucket;

const CarCard = ({ bucket }) => {

    var status;
    if (bucket.status == "true") {
    status = <span className="text-green-500">{bucket.name}</span>;
    } else {
    status = <span className="text-red-500">{bucket.name}</span>;
    }

    return (
        <div className="pt-10 pl-10">

            <div className="p-4 rounded overflow-hidden shadow-lg">
                <div className="pt-4 pl-2">
                    <div className="grid grid-cols-1 font-bold text-xl">
                        <details>
                            <summary className="p-4">{status}</summary>
                            <div>{bucket.desc}</div>
                        </details>
                    </div>
                </div>
            </div>

        </div>
    );
};

