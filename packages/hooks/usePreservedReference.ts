import { useEffect, useState } from 'react';
import { checkDeeplyEqual } from '@supercarmarket/lib';

type NotNullishValue = {};

/**
 * @description
 * comparator로 비교했을 때 값이 변경되었을 때에만 레퍼런스를 변경하도록 합니다.
 *
 * 기본으로는 JSON.stringify를 했을 때 동일한 값이면 레퍼런스를 유지합니다.
 *
 * function usePreservedReference<T extends NotNullishValue>(
 *   // 레퍼런스를 보존할 값
 *   value: T,
 *   // 값의 동일성을 검증하는 함수
 *   // default: checkDeeplyEqual
 *   checkValuesEqual: (a: T, b: T) => boolean = checkDeeplyEqual
 * ): T
 * ```
 *
 * @example
 * const params = usePreservedReference(loggerParams, checkParamsEqual);
 *
 * @ref
 * https://slash.page/libraries/react/react/src/hooks/usepreservedreference.ts.tossdocs/
 */

export default function usePreservedReference<T extends NotNullishValue>(
  value: T,
  checkValuesEqual: (a: T, b: T) => boolean = checkDeeplyEqual
) {
  const [reference, setReference] = useState<T>(value);

  useEffect(() => {
    if (!checkValuesEqual(value, reference)) {
      setReference(value);
    }
  }, [checkValuesEqual, reference, value]);

  return reference;
}
