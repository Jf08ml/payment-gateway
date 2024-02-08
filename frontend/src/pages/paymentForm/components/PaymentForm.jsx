export const PaymentForm = ({ formData, handleChange, countries }) => {
  return (
    <>
      <input
        placeholder="Primer nombre y apellidos"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        placeholder="Numero de identificación"
        type="number"
        name="document"
        value={formData.document}
        onChange={handleChange}
      />
      <input
        placeholder="Profesión"
        type="text"
        name="profession"
        value={formData.profession}
        onChange={handleChange}
      />
      <input
        placeholder="Correo Electrónico"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <select
        name="country"
        value={formData.country || ""}
        onChange={handleChange}
      >
        <option value="">Selecciona un país</option>
        {countries.map((country) => (
          <option key={country.countryCode} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
      <div>
        <select
          name="prefix"
          value={formData.prefix || ""}
          onChange={handleChange}
          style={{ width: "30%" }}
        >
          <option value="">Código</option>
          {countries.map((country) => (
            <option key={country.countryCode} value={country.prefix}>
              {country.prefix}
            </option>
          ))}
        </select>
        <input
          placeholder="Número de teléfono"
          type="number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          style={{ width: "66.9%" }}
        />
      </div>
    </>
  );
};
