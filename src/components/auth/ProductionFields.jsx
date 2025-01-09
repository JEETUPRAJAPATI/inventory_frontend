import FormSelect from '../common/FormSelect';
import { bagTypes, operatorTypesByBag } from '../../constants/productionTypes';

export default function ProductionFields({ formData, onChange }) {
  // Only show production fields for regular production role, not production manager
  if (formData.registrationType !== 'production') {
    return null;
  }

  const selectedBagOperators = operatorTypesByBag[formData.bagType] || [];

  return (
    <>
      <FormSelect
        label="Bag Type"
        id="bagType"
        name="bagType"
        required
        value={formData.bagType || ''}
        onChange={onChange}
        options={bagTypes}
      />

      {formData.bagType && (
        <FormSelect
          label="Operator Type"
          id="operatorType"
          name="operatorType"
          required
          value={formData.operatorType || ''}
          onChange={onChange}
          options={selectedBagOperators}
        />
      )}
    </>
  );
}