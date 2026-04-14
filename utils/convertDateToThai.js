export function convertDateToThai(text) {
    const map = {
        // Days
        Monday: "จันทร์",
        Tuesday: "อังคาร",
        Wednesday: "พุธ",
        Thursday: "พฤหัสบดี",
        Friday: "ศุกร์",
        Saturday: "เสาร์",
        Sunday: "อาทิตย์",

        // Months (short)
        Jan: "ม.ค.",
        Feb: "ก.พ.",
        Mar: "มี.ค.",
        Apr: "เม.ษ.",
        May: "พ.ค.",
        Jun: "มิ.ย.",
        Jul: "ก.ค.",
        Aug: "ส.ค.",
        Sep: "ก.ย.",
        Oct: "ต.ค.",
        Nov: "พ.ย.",
        Dec: "ธ.ค.",

        // Months (full)
        January: "มกราคม",
        February: "กุมภาพันธ์",
        March: "มีนาคม",
        April: "เมษายน",
        May_full: "พฤษภาคม",
        June: "มิถุนายน",
        July: "กรกฎาคม",
        August: "สิงหาคม",
        September: "กันยายน",
        October: "ตุลาคม",
        November: "พฤศจิกายน",
        December: "ธันวาคม"
    };

    return text.replace(
        /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|June|July|August|September|October|November|December)\b/g,
        m => map[m] || m
    ).replace("May ", "พฤษภาคม ").replace(" May", " พ.ค.");
}