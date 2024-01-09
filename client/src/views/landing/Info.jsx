import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const Info = () => {
    return (
        <div className="w-7/12 h-full p-8 flex flex-col justify-around">
            <h1 className={"text-5xl font-semibold"}>
                About us:
            </h1>
            <ul className={"p-1"}>
                <li className={"mb-2"}>
                    <AssignmentTurnedInIcon />
                    <span className={"font-bold text-violet-900 text-lg"}>
                        Real-time attendance tracking.
                        <br />
                    </span>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    Parents can access a real-time attendance tracking system, allowing them to monitor their child's attendance in each class.
                </li>
                <li className={"mb-2"}>
                    <AssignmentTurnedInIcon />
                    <span className={"font-bold text-violet-900 text-lg"}>
                        Real-time grades tracking.
                        <br />
                    </span>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    Parents can view their child's academic progress through an integrated online gradebook.
                </li>
                <li className={"mb-2"}>
                    <AssignmentTurnedInIcon />
                    <span className={"font-bold text-violet-900 text-lg"}>
                        User-Friendly interface.
                        <br />
                    </span>
                    The system should feature a user-friendly interface that allows parents to navigate easily,
                    ensuring that even those less familiar with technology can use it effectively.
                </li>
                <li>
                    <AssignmentTurnedInIcon />
                    <span className={"font-bold text-violet-900 text-lg"}>
                        Full-time acess.
                        <br />
                    </span>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    With 24/7 access, geographical barriers are eliminated. Parents, regardless of their location or time zone, can stay connected to their child's education.
                </li>
            </ul>
        </div>
    )
}

export default Info;