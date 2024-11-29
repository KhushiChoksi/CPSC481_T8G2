export default function SeachBar() {
    return (
        <section style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Restaurant</h1>
        <div style={{ 
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
  
        }}>
          <input
            type="text"
            placeholder="Search....."
            style={{
              width: '590%',
              padding: '5px',
              fontSize: '16px',
              borderRadius: '20px',
              border: '2px solid #252F40',
            }}
          />
        </div>
        <style>
        {`
          @media (max-width: 600px) {
            input {
              width: 80%; // Adjust width for smaller screens
            }
          }
        `}
      </style>
      </section>
      );
}