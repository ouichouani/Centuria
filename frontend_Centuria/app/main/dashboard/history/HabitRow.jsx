
export default function HabitRow({ habit, daysInMonth }) {

    let log_index = 0;

    const currentDate = new Date().setHours(0, 0, 0, 0); // 'DD/MM/YYYY'

    const logs = habit.logs.filter(item => daysInMonth[0].setHours(0, 0, 0, 0) <= new Date(item.completed_date).setHours(0, 0, 0, 0))

    const result = daysInMonth.map((date_obj, key) => {

        const index_date = new Date(date_obj).setHours(0, 0, 0, 0);
        const is_included_today = habit.frequency.includes(date_obj.toLocaleDateString("en-US", { weekday: "long", }));

        if (currentDate > index_date && is_included_today && new Date(habit.created_at).setHours(0, 0, 0, 0) <= index_date) {
            if (logs[log_index] && new Date(logs[log_index].completed_date).setHours(0, 0, 0, 0) == index_date) {

                log_index++

                return (
                    <td key={key} className="border-x border-solid border-[#86878b] min-w-[25px] h-[25px] text-center bg-green-800">
                        <img src="/svg/ok.svg" className="w-[15px] m-auto" alt="" />
                    </td>
                )

            } else {
                return (
                    <td key={key} className="border-x border-solid border-[#86878b] min-w-[25px] h-[25px] text-center bg-red-800">
                        <img src="/svg/x.svg" className="w-[15px] m-auto" alt="" />
                    </td>
                )
            }

        } else if (currentDate == index_date && is_included_today) {
            if (logs[log_index] && new Date(logs[log_index].completed_date).setHours(0, 0, 0, 0) == index_date) {
                return (
                    <td key={key} className="border-x border-solid border-[#86878b] min-w-[25px] h-[25px] text-center bg-green-800">
                        <img src="/svg/ok.svg" className="w-[15px] m-auto" alt="" />
                    </td>
                )

            } else {
                return (
                    <td key={key} className="border-x border-solid border-[#86878b] min-w-[25px] h-[25px] text-center bg-red-800">
                        <img src="/svg/x.svg" className="w-[15px] m-auto" alt="" />
                    </td>
                )
            }
        } else {
            return (
                <td key={key} className="border-x border-solid border-[#86878b] min-w-[25px] text-center"></td>
            )
        }
    });

    return (
        result
    )

}
