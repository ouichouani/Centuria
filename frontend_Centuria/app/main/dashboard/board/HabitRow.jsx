import Log from "./Log";

export default function HabitRow({ habit, daysInMonth }) {

    let log_index = 0;
    const currentDate = new Date().setHours(0, 0, 0, 0); // 'DD/MM/YYYY'

    const result = daysInMonth.map((date_obj, key) => {

        const index_date = new Date(date_obj).setHours(0, 0, 0, 0);
        const is_included_today = habit.frequency.includes(date_obj.toLocaleDateString("en-US", { weekday: "long", }));

        if (currentDate > index_date && is_included_today && new Date(habit.created_at).setHours(0, 0, 0, 0) <= index_date) {
            if (habit.logs[log_index] && new Date(habit.logs[log_index].completed_date).setHours(0, 0, 0, 0) == index_date) {

                log_index++

                return (
                    <td key={key} className="border-x border-solid border-[#86878b] min-w-[25px] text-center bg-green-800">
                        <img src="/svg/ok.svg" className="w-[15px] m-auto" alt="" />
                    </td>
                )

            } else {
                return (
                    <td key={key} className="border-x border-solid border-[#86878b] min-w-[25px] text-center bg-red-800">
                        <img src="/svg/x.svg" className="w-[15px] m-auto" alt="" />
                    </td>
                )
            }

        } else if (currentDate == index_date && is_included_today) {
            return (
                <Log key={key} habit={habit} log_index={log_index} index_date={index_date} />
            )
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
