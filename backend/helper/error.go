package helper

import (
	"log"
	"runtime"
)

func PanicIfError(err error) {
	if err != nil {
		pc,_,_,_ := runtime.Caller(1)
		funcName := runtime.FuncForPC(pc).Name()

		log.Printf("ERROR SOURCE: %s",funcName)
		log.Printf("ERROR DETAILS: %v", err)
		log.Printf("ERROR TYPE: %T", err)
		log.Printf("PANIC ERROR TERJADI: %+v\n", err)
		panic(map[string]interface{}{
			"error":   err.Error(),
			"message": "Internal server error occurred",
			"status":  500,
		})
	}
}

func ValidationError(err error) error {
	if err != nil {
		log.Printf("Validation error: %v", err)
		return err
	}
	return nil
}
