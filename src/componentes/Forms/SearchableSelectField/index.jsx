import React, { forwardRef } from "react";
import { redirect } from "react-router-dom";
import Select from "react-select";

const SearchableSelectField = forwardRef(
  ({ options, label, error, onChange, ...rest }, ref) => {
    // Converte as opções para o formato usado pelo react-select
    const selectOptions = options.map((option) => ({
      value: option.value,
      label: option.name,
    }));

    // Cria uma função de manipulação personalizada
    const handleChange = (selectedOption) => {
      // Cria um objeto de evento sintético
      const event = {
        target: {
          name: rest.name,
          value: selectedOption ? selectedOption.value : "",
        },
      };

      // Chama a função onChange com o objeto de evento sintético
      onChange(event);
    };

    return (
      <div className="mb-5">
        {label && (
          <label
            className="block mb-2 text-sm font-medium text-gray-900 ml-2 text-left"
            htmlFor={rest.name}
          >
            {label}:
          </label>
        )}
        <Select
          className="basic-single text-left text-sm text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-0.5"
          classNamePrefix="select"
          isSearchable={true}
          name={rest.name}
          options={selectOptions}
          onChange={handleChange} // Usa a função de manipulação personalizada
          ref={ref}
          {...rest}
        />
        {error && (
          <p className="mt-2 text-sm text-left ml-1 text-red-600 dark:text-red-500">
            <span className="font-medium">{error}</span>
          </p>
        )}
      </div>
    );
  },
);

export default SearchableSelectField;
