import { parse } from "querystring";

export class DateUtil {

    public static dateToStringSQL(date: Date): string {
        try {
            let year = date.getFullYear().toString();
            let month = (date.getMonth() + 1).toString();
            let day = date.getDate().toString();

            if (month.toString().length < 2) { month = "0" + month; }
            if (day.toString().length < 2) { day = "0" + day; }

            return year + "-" + month + "-" + day;

        } catch (error) {
            return null;
        }
    }

    public static sqlToDate(sql:string):Date{
        console.info("sqlToDate");
        let split = sql.split(" ");
        let data = split[0];
        let horario = split[1];
        let dataSplit = data.split("-");

        let date = new Date();
        date.setDate(parseInt(dataSplit[2]));
        date.setMonth(parseInt(dataSplit[1]) - 1);
        date.setFullYear(parseInt(dataSplit[0]));
        
        return date;
    }

    public static dateBrToStringSQL(date: string): string {
        if (this.validationDateDDMMYYYY(date)) {
            let controle = date.split("/");
            return controle[2] + "-" + controle[1] + "-" + controle[0];
        }
    }

    /*  public static validationDateDDMMYYYY(dateString): boolean {
         var m = dateString.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
         var date = (m) ? new Date(m[3], m[2] - 1, m[1]) : null;
 
         return false;
     } */

    public static validationDateDDMMYYYY(dateString): boolean {

        var dob = dateString.split('/');
        var dd = dob[0];
        var mm = dob[1];
        var yy = dob[2];

        if (dd == '' || mm == '' || yy == '' || isNaN(dd) || isNaN(mm) || isNaN(yy) || dd == 0 || mm == 0 || yy == 0) {
            console.log("Invalid Date of Birth");
            return false;
        }
        else {
            if (dob.length != 3) {
                console.log("Please enter Date Of Birth in (dd/mm/yyyy) format");
                return false;
            }
            else {
                if ((mm == 4 || mm == 6 || mm == 9 || mm == 11) && dd > 30) {
                    console.log("Please enter Day less than equal to 30");
                    return false;
                }
                if ((mm == 1 || mm == 3 || mm == 5 || mm == 7 || mm == 8 || mm == 10 || mm == 12) && dd > 31) {
                    console.log("Please enter Day less than equal to 31");
                    return false;
                }
                if (mm == 2) {
                    var lyear = false;
                    if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                        lyear = true;
                    }
                    if ((lyear == false) && (dd >= 29)) {
                        console.log('Invalid date format in February!');
                        return false;
                    }
                    if ((lyear == true) && (dd > 29)) {
                        console.log('Invalid date format in February!');
                        return false;
                    }
                }
                if (parseFloat(dob[1]) > 12) {
                    console.log("Please enter Month less than equal to 12");
                    return false;
                }
                if (dob[2].length != 4) {
                    console.log("Please enter Year in Four Digit (yyyy)");
                    return false;
                }
            }
        }

        return true;
    }



}