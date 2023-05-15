import { SplitPhoneNumberFields, MergePhoneNumberFields } from '../FormatPhoneNumber';

describe('Formatting phone numbers', () => {
  it('should return a single formatted number when formatting for submission when there are no special characters', () => {
    const response = MergePhoneNumberFields({
      diallingCode: '+61 (Australia)', // this is passed from an autocomplete field
      telephoneNumber: '123',
    });
    expect(response).toStrictEqual('(61)123');
  });

  it('should return a single formatted number when formatting for submission  when there are special characters', () => {
    const response = MergePhoneNumberFields({
      diallingCode: '+61 (Australia)', // this is passed from an autocomplete field
      telephoneNumber: '123-456.789 123+456',
    });
    expect(response).toStrictEqual('(61)123456789123456');
  });

  it('should return a diallingCode and telephoneNumber when formatting for display', () => {
    const response = SplitPhoneNumberFields('(44)123456789');
    expect(response).toStrictEqual({
      diallingCode: '+44',
      telephoneNumber: '123456789',
    });
  });
});
