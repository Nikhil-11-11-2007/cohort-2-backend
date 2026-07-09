const Healthcare = () => {
    return (
        <div className='container'>
            <h1 className="title">HealthCare Application</h1>
            <p className='account-info'>Connected Account: </p>
            <p className='owner-info'>You are the contract owner</p>

            <div className='form-section'>
                <h2>Fetch Patient Records</h2>
                <input className='input-field' type='text' placeholder='Enter Patient ID' value="" onChange="" />
                <button className='action-button' onClick="">Fetch Records</button>
            </div>

            <div className="form-section">
                <h2>Add Patient Record</h2>
                <input className='input-field' type='text' placeholder='pateint name' value="" onChange="" />
                <input className='input-field' type='text' placeholder='Diagnosis' value="" onChange="" />
                <input className='input-field' type='text' placeholder='Treatment' value="" onChange="" />
                <button className='action-button' onClick="">Add Records</button>

            </div>
            <div className="form-section">
                <h2>Authorize HealthCare Provider</h2>
                <input className='input-field' type="text" placeholder='Provider Address' value="" onChange="" />
                <button className='action-button' onClick="">Authorize Provider</button>
            </div>

            {/* <div className='records-section'>
                <h2>Patient Records</h2>
                {patientRecords.map((record, index) => (
                    <div key={index}>
                        <p>Record ID: {record.recordID.toNumber()}</p>
                        <p>Diagnosis: {record.diagnosis}</p>
                        <p>Treatment: {record.treatment}</p>
                        <p>Timestamp: {new Date(record.timestamp.toNumber() * 1000).toLocaleString()}</p>
                    </div>
                ))}
            </div> */}

        </div>

    )

}

export default Healthcare;