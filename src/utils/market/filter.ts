import { FILTER_DATANAMES } from 'constants/market';

export const makeFilter = () => {
  let forms;
  let check = '';
  const filters = [];

  for (const { subject, dataName } of FILTER_DATANAMES) {
    forms = document.forms['market-filter' as any][dataName];

    check = forms[0];
    if (check === undefined) {
      const { ariaLabel, value } = forms;
      if (value) {
        filters.push({ subject, option: ariaLabel, value: value });
      }
    } else {
      const [
        { ariaLabel: firstLabel, value: firstValue },
        { ariaLabel: secondLabel, value: secondValue },
      ] = forms;

      if (firstValue && secondValue) {
        filters.push({
          subject,
          option:
            firstValue > secondValue
              ? `${secondLabel}~${secondLabel}`
              : `${firstLabel}~${secondLabel}`,
          value:
            firstValue > secondValue
              ? `${secondValue} ${secondValue}`
              : `${firstValue} ${secondValue}`,
        });
      }
    }
  }

  return filters;
};
