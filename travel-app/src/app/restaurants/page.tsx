export default function RestaurantsPage() {
    return (
      <section style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Restaurant</h1>
      <div style={{ 
        position : 'absolute',
        top : '200px',
        left : '18%',
        transform: 'translateX(-50%)',

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
    </section>
    );
  }