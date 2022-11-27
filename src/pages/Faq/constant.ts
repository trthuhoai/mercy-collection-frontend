const listFaq = [
  {
    title: 'Có nên ủng hộ trên Mercy Collection.vn không?',
    desc: 'Trên Mercy Collection, bạn có thể lựa chọn các Dự án cộng đồng phù hợp với mong muốn của mình để ủng hộ. Các dự án trên Mercy Collection được thực hiện bởi các Tổ chức từ thiện, xã hội và môi trường có chuyên môn, uy tín và có chức năng tiếp nhận tài trợ theo quy định của pháp luật. Số tiền ủng hộ của bạn được chuyển thẳng tới các Tổ chức mà không thông qua bên thứ ba nào để đảm bảo sự minh bạch và hiệu quả.',
  },
  {
    title: 'Đóng góp trên Mercy Collection.vn có an toàn không?',
    desc: 'Việc ủng hộ cho các dự án thiện nguyện trên Mercy Collection.vn tuyệt đối an toàn, tiền ủng hộ được thanh toán qua các cổng thanh toán uy tín như Viettel Pay, VnPay,..và tới trực tiếp tài khoản của các Tổ chức gây quỹ có tư cách pháp nhân, Mercy Collection chỉ ghi nhận và minh bạch hóa các thông tin.',
  },
  {
    title: 'Những phương thức thanh toán nào có thể được sử dụng để quyên góp?',
    desc: 'Mercy Collection hợp tác với các đối tác trung gian thanh toán và tích hợp đa dạng các phương thức thanh toán khác nhau để thuận tiện nhất cho người ủng hộ, bạn có thể lựa chọn bất cứ phương thức thanh toán nào phù hợp nhất với mình.',
  },
  {
    title: 'Những khoản phí nào được áp dụng cho các khoản đóng góp?',
    desc: 'Mercy Collection không thu bất cứ khoản phí nào từ người ủng hộ. Người ủng hộ chỉ mất phí tiện ích/ phí dịch vụ (phí chuyển tiền thông thường) cho các nền tảng trung gian thanh toán được quy định bởi các bên',
  },
  {
    title:
      'Với tư cách là người ủng hộ, tôi có thể thay đổi hoặc ẩn tên của mình không?',
    desc: 'Bạn có thể lựa chọn ẩn danh đối với các khoản đóng góp tại bước lựa chọn số tiền, và điền thông tin người ủng hộ.',
  },
  {
    title: 'Làm sao để tôi kiểm tra được khoản ủng hộ của mình?',
    desc: 'Ngay sau khi chuyển tiền ủng hộ thành công cho một dự án thông qua các nền tảng thanh toán tích hợp trên Mercy Collection.vn, bạn sẽ thấy khoản ủng hộ của mình trong mục Danh sách ủng hộ của Dự án mà bạn chọn, bao gồm: Tên người ủng hộ (do bạn nhập thông tin) + Số tiền ủng hộ + Thời gian ủng hộ. Toàn bộ số tiền ủng hộ của bạn được chuyển thẳng tới tài khoản của Tổ chức gây quỹ mà không qua bên thứ ba nào khác.',
  },
  {
    title:
      'Ngoài ủng hộ bằng tiền, tôi có thể ủng hộ các dự án bằng cách khác không?',
    desc: 'Ngoài ghi nhận đóng góp bằng tiền, Mercy Collection cho phép người dùng đóng góp bằng công sức thông qua chức năng Sứ giả truyền thông gây quỹ và ghi nhận các thông tin cần thiết một cách minh bạch. Hoặc bạn cũng có thể sử dụng nút chia sẻ để lan tỏa dự án thiện nguyện tới bạn bè của mình trên các mạng xã hội.',
  },
  {
    title: 'Tôi có cần đăng ký vào Mercy Collection.vn để ủng hộ không?',
    desc: 'Bạn có thể ủng hộ cho các Dự án gây quỹ trên Mercy Collection.vn mà không cần phải đăng ký làm thành viên của Mercy Collection. Tuy nhiên việc đăng ký sẽ giúp bạn tương tác và cập nhật tốt hơn các thông tin về dự án và tổ chức mà bạn quan tâm, ủng hộ.',
  },
  {
    title:
      'Những loại dự án nào có thể được khởi chạy trên Mercy Collection.vn?',
    desc: 'Mercy Collection là một nền tảng hỗ trợ các hoạt động mang lại lợi ích cho cộng đồng và xã hội, các dự án khởi chạy trên Mercy Collection phải được thực hiện bởi các tổ chức có chức năng gây quỹ và tiếp nhận tài trợ nhằm mục tiêu phục vụ cho các hoạt động từ thiện, xã hội và môi trường, theo tôn chỉ, mục đích của tổ chức mình và theo quy định của pháp luật. Để được khởi tạo dự án gây quỹ trên Mercy Collection.vn, tổ chức cần ký hợp đồng sử dụng nền tảng công nghệ thông tin với Mercy Collection và hợp đồng sử dụng cổng thanh toán với các đối tác trung gian thanh toán của Mercy Collection',
  },
  {
    title: 'Mất bao lâu để một dự án gây quỹ được chấp thuận?',
    desc: 'Mercy Collection là nền tảng cho phép các Tổ chức gây quỹ chủ động khởi tạo các dự án trên Mercy Collection.vn, các tổ chức có thể tự tạo dự án với các mục tiêu về thời gian gây quỹ, số tiền gây quỹ, nội dung và các thông tin liên quan. ',
  },
  {
    title: 'Dự án gây quỹ của tôi có thời hạn không?',
    desc: 'Các dự án gây quỹ trên Mercy Collection.vn được đề nghị gây quỹ không quá 60 ngày/dự án, để đảm bảo việc tập trung và truyền thông cho dự án. Tùy từng trường hợp, thời gian gây quỹ có thể được kéo dài.',
  },
  {
    title: 'Làm cách nào để cập nhật và cảm ơn các nhà tài trợ của tôi?',
    desc: 'Nền tảng Mercy Collection tự động cập nhật các tình trạng cho nhà tài trợ và các sứ giả gây quỹ hay những người quan tâm tới dự án của tổ chức, khi dự án hoàn thành gây quỹ, kết thúc thời gian gây quỹ, nhập các báo cáo triển khai, giai ngân.    ',
  },
  {
    title: 'Làm cách nào để nhận các khoản đóng góp trên Mercy Collection.vn?',
    desc: 'Các khoản ủng hộ thông qua Mercy Collection sẽ được chuyển thẳng tới Tài khoản ngân hàng của các Tổ chức gây quỹ trong thời gian T+1 kể từ thời điểm người ủng hộ chuyển tiền.',
  },
  {
    title:
      'Điều gì sẽ xảy ra nếu ai đó đưa cho tôi tiền mặt? (Đóng góp ngoại tuyến)',
    desc: 'Bạn có thể ghi lại thông tin người ủng hộ và thay mặt họ thực hiện việc ủng hộ thông qua Mercy Collection.vn để cập nhật danh sách người ủng hộ lên trang dự án.',
  },
  {
    title: 'Bạn bè quốc tế của tôi có thể quyên góp cho Dự án của tôi không?',
    desc: 'Bạn bè của bạn có thể thanh toán thông qua hình thức thanh toán qua thẻ quốc tế. Tuy nhiên, việc tiếp nhận ủng hộ từ các tổ chức, cá nhân nước ngoài chịu sự quản lý của các quy định pháp luật, bạn vui lòng tìm hiểu kỹ trước khi tiếp nhận các khoản ủng hộ này.',
  },
  {
    title: 'Làm cách nào để kết thúc Dự án của tôi?',
    desc: 'Dự án sẽ tự động kết thúc khi hết thời gian gây quỹ hoặc số tiền gây quỹ đạt được mục tiêu. Trong trường hợp khác, bạn vui lòng liên hệ Mercy Collection để được hỗ trợ.',
  },
  {
    title:
      'Dự án của tôi có ngừng nhận quyên góp khi tôi đạt được mục tiêu không?',
    desc: 'Dự án sẽ tự động kết thúc khi kết thúc thời gian hay đạt được số tiền mục tiêu gây quỹ. Người ủng hộ không thể tiếp tục ủng hộ cho dự án này.',
  },
  {
    title:
      'Tôi có thể tiếp cận với các nhà tài trợ đã đóng góp cho Dự án của tôi không?',
    desc: 'Để tuân thủ chính sách riêng tư, bảo mật, các tổ chức gây quỹ không thể tiếp cận thông tin nhà tài trợ. Mercy Collection chỉ cung cấp danh sách được nhà tài trợ đồng ý bao gồm: Tên nhà tài trợ, số tiền tài trợ, thời gian tài trợ. Đồng thời, các tổ chức gây quỹ có thể tiếp cận các phân tích về nhà tài trợ để phục vụ cho mục đích phi lợi nhuận của mình, bao gồm: Giới tính, độ tuổi, địa lý.',
  },
  {
    title: 'Tôi có thể chia sẻ Dự án của mình lên Facebook không?',
    desc: 'Bạn hoàn toàn có thể và Mercy Collection khuyến khích bạn chia sẻ và lan tỏa Dự án của mình tới bạn bè thông qua Facebook để đạt hiệu quả gây quỹ cao hơn. Biểu tượng chia sẻ được gắn ở mỗi dự án cụ thể.',
  },
];
export { listFaq };
