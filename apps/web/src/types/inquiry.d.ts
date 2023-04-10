declare module Inquiry {
  interface Common {
    title: string;
  }

  interface InquiryLink extends Inquiry.Common {
    link: string;
    description?: string;
  }

  interface InquiryDto extends Inquiry.Common {
    id: string;
    category: string;
    status: number;
    created: string;
  }
}
