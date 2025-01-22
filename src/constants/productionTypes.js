export const bagTypes = [
  { value: 'w_cut', label: 'W-Cut Box Bag' },
  { value: 'd_cut', label: 'D-Cut Loop Handle' },
];

export const operatorTypesByBag = {
  'w_cut': [
    { value: 'flexo_printing', label: 'Flexo Printing' },
    { value: 'w_cut_bagmaking', label: 'W-Cut Bag Making' },
  ],
  'd_cut': [
    { value: 'd_cut_bagmaking', label: 'D-Cut Bag Making' },
    { value: 'opsert_printing', label: 'Opsert Printing' },
  ],
};

export const productionManagerBagTypes = [
  { value: 'w_cut', label: 'W-Cut' },
  { value: 'd_cut', label: 'D-Cut' },
];