function Payment(){
    const handleSubmit = async(e) =>{
        e.preventDefault()
    }
    return(
        <div className="body">
            <div className="form-box">
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="cardholder_name">Cardholder's Name</label>
                    <input type="text" name="cardholder_name" />

                    <label htmlFor="card_number">Card number</label>
                      <input name="cardholder_name" type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}" 
                        autocomplete="cc-number" maxlength="19" 
                        placeholder="xxxx xxxx xxxx xxxx" required></input>                    
                    <label htmlFor="expire_date">Expiry date</label>
                    <input type="date" name="expiry_date" />
                    <label htmlFor="cvv">CVV</label>
                    <input
                        type="password"
                        inputMode="numeric"
                        pattern="[0-9]{3,4}"
                        maxLength={4}
                    />
                    <button type="submit">Pay now</button>
                </form>
            </div>
        </div>
    )
}

export default Payment