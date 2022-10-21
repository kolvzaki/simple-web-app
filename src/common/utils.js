import moment from "moment";

export const timeFormatter = (time = '') => {
    try{
        return moment(time).format('yyyy-MM-DD HH:mm:ss')
    } catch (e){
        return "Invalid date time"
    }
}