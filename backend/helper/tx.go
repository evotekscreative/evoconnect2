package helper

import (
	"database/sql"
	"fmt"
)

func CommitOrRollback(tx *sql.Tx) {
	if r := recover(); r != nil {
		// Log error sebelum rollback
		fmt.Printf("Transaction error, rolling back: %v\n", r)

		errorRollback := tx.Rollback()
		if errorRollback != nil {
			fmt.Printf("Rollback error: %v\n", errorRollback)
		}
		// panic(r)
		return
	} else {
		if err := tx.Commit(); err != nil {
			fmt.Printf("Commit error: %v\n", err)
			if err := tx.Rollback(); err != nil {
				fmt.Printf("Rollback error: %v\n",err)
			}

		}
	}
}
