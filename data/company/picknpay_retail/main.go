package main

import (
	"fmt"
	"time"

	"github.com/360EntSecGroup-Skylar/excelize"
)

func main() {

	rows := readingExcel()
	//fmt.Println(rows, len(rows))

	for i, row := range rows {

		fmt.Println(i, "-->", row)
	}

	//time := parseDateTime("2012-11-14T10:37:52.293Z")
	//fmt.Println("time::", time)

}

func parseDateTime(dateTimeStr string) string {

	//layout := "2006-01-02T15:04:05"
	//str := "2014-11-12T11:45:26.371Z"
	//t, err := time.Parse(layout, dateTimeStr)
	t, err := time.Parse(time.RFC3339, dateTimeStr)

	if err != nil {
		//fmt.Println("ERROR:", err.Error())
		return ""
	}
	//fmt.Println(t)
	return t.Format("2006-01-02 15:04:05")
}

//Reading form excel file
func readingExcel() []map[string]string {

	//Reading spreadsheet
	f, err := excelize.OpenFile("AccChartOfParentAccount_9_174.xlsx")
	if err != nil {
		fmt.Println(err)
		return nil
	}

	rows, _ := f.Rows("Sheet1")
	i := 0

	sRows := make([]map[string]string, 0)

	for rows.Next() {

		cols, _ := rows.Columns()
		var code, name, atype, parentCode, createDate string
		for c, colVal := range cols {

			if c == 0 {
				code = colVal
			}
			if c == 1 {
				name = colVal
			}
			if c == 2 {
				atype = colVal
			}
			if c == 4 {
				parentCode = colVal
			}
			if c == 6 {
				createDate = parseDateTime(colVal)
			}

		}
		var groupType string
		if atype == "1" {
			groupType = "Asset"
		} else if atype == "2" {
			groupType = "Liability"
		} else if atype == "3" {
			groupType = "Revenue"
		} else if atype == "4" {
			groupType = "Expense"
		}

		if i > 0 {
			srow := make(map[string]string, 0)
			srow["name"] = name
			srow["code"] = code
			srow["parent"] = parentCode
			srow["group_type"] = groupType
			srow["create_date"] = createDate
			sRows = append(sRows, srow)
		}
		//fmt.Println(i, "-->", code, name, atype, parentCode, createDate)
		i++
	}
	return sRows
}
