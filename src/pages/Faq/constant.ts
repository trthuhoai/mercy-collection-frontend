const listFaq = [
  {
    title: 'Có nên đăng ký tham gia các hoạt động tình nguyện trên Mercy Collection không?',
    desc: 'Trên Mercy Collection, bạn có thể lựa chọn các Dự án cộng đồng phù hợp với khả năng, mong muốn của mình để tham gia. Các dự án trên Mercy Collection được thực hiện bởi các Tổ chức từ thiện, xã hội và môi trường có chuyên môn, uy tín và có chức năng tiếp nhận tài trợ theo quy định của pháp luật.',
  },
  {
    title: 'Tôi sẽ mất khoản phí nào khi tham gia hoạt động thiện nguyện không?',
    desc: 'Mercy Collection không thu bất cứ khoản phí nào từ thành viên. Sau các hoạt động thiện nguyện, bạn sẽ nhận được các phí hỗ trợ, các phần quà hoặc chứng nhận tuỳ vào dự án mà bạn tham gia ',
  },
  {
    title:
      'Với tư cách là người đăng ký, tôi có thể thay đổi hoặc ẩn tên của mình không?',
    desc: 'Bạn không thể lựa chọn ẩn danh khi đăng ký tham gia các dự án thiện nguyện.',
  },
  {
    title: 'Làm sao để tôi kiểm tra được các dự án mà tôi đã đăng ký tham gia?',
    desc: 'Ngay sau khi đăng ký tham gia dự án thành công trên Mercy Collection.vn, bạn sẽ thấy các dự án đã đăng ký tham gia của mình trong mục Dự án đã đăng ký.',
  },
  {
    title:
      'Ngoài ủng hộ bằng tiền, tôi có thể ủng hộ các dự án bằng cách khác không?',
    desc: 'Ngoài ghi nhận đóng góp bằng tiền, Mercy Collection cho phép người dùng đóng góp bằng công sức thông qua chức năng Sứ giả truyền thông gây quỹ và ghi nhận các thông tin cần thiết một cách minh bạch. Hoặc bạn cũng có thể sử dụng nút chia sẻ để lan tỏa dự án thiện nguyện tới bạn bè của mình trên các mạng xã hội.',
  },
  {
    title: 'Tôi có cần đăng ký vào Mercy Collection.vn để có thể đăng ký tham gia không?',
    desc: 'Bạn cần phải đăng ký làm thành viên của Mercy Collection để đăng ký tham gia các dự án. Việc đăng ký sẽ giúp bạn tương tác và cập nhật tốt hơn các thông tin về dự án và tổ chức mà bạn quan tâm, ủng hộ.',
  },
  {
    title:
      'Những loại dự án nào có thể được khởi chạy trên Mercy Collection.vn?',
    desc: 'Mercy Collection là một nền tảng hỗ trợ các hoạt động mang lại lợi ích cho cộng đồng và xã hội, các dự án khởi chạy trên Mercy Collection phải được thực hiện bởi các cá nhân, tổ chức tiếp nhận tài trợ nhằm mục tiêu phục vụ cho các hoạt động từ thiện, xã hội và môi trường, theo tôn chỉ, mục đích của tổ chức mình và theo quy định của pháp luật. Để được khởi tạo thành công dự án tình nguyện trên Mercy Collection, cá nhân hoặc tổ chức cần nhận được phê duyệt của admin hệ thống',
  },
  {
    title: 'Mất bao lâu để một dự án tình nguyện được chấp thuận?',
    desc: 'Mercy Collection là nền tảng cho phép các Tổ chức tình nguyện chủ động khởi tạo các dự án trên Mercy Collection, các tổ chức có thể tự tạo dự án với các mục tiêu về thời gian gây quỹ, số thành viên tối đa, nội dung và các thông tin liên quan. ',
  },
  {
    title: 'Dự án tình nguyện của tôi có thời hạn không?',
    desc: 'Các dự án tình nguyện trên Mercy Collection được yêu cầu nhập hạn đăng ký khi tạo một dự án mới.',
  },
  {
    title: 'Làm cách nào để cập nhật và cảm ơn các thành viên đã đăng ký tham gia dự án của tôi?',
    desc: 'Nền tảng Mercy Collection tự động cập nhật các thông tin các thành viên đăng ký tham gia dự án và có tính năng gửi mail cho toàn bộ thành viên đã đăng ký tham gia  ',
  },
  {
    title:
      'Tôi có thể đăng ký tham gia dự án thiện nguyện giúp bạn của tôi không?',
    desc: 'Hiện tại hệ thống không cho phép đăng ký giúp, chúng tôi sẽ tiếp tục phát triển tính năng này để đem lại sự tiện ích cho thành viên.',
  },
  {
    title: 'Làm cách nào để kết thúc Dự án của tôi?',
    desc: 'Dự án sẽ tự động kết thúc khi hết thời hạn đăng ký hoặc số lượt đăng ký tham gia đạt được mục tiêu. Trong trường hợp khác, bạn vui lòng liên hệ Mercy Collection để được hỗ trợ.',
  },
  {
    title:
      'Dự án của tôi có ngừng nhận đăng ký khi tôi đạt được mục tiêu không?',
    desc: 'Dự án sẽ tự động kết thúc khi kết thúc thời gian hay đạt được mục tiêu số lượt đăng ký. Các thành viên không thể tiếp tục đăng ký tham gia dự án này.',
  },
  {
    title:
      'Tôi có thể thông báo thông tin tình nguyện cho các thành viên đã đăng ký tham gia Dự án của tôi không?',
    desc: 'Để tuân thủ chính sách riêng tư, bảo mật, các tổ chức gây quỹ không thể tiếp cận thông tin nhà tài trợ. Mercy Collection chỉ cung cấp danh sách được nhà tài trợ đồng ý bao gồm: Tên nhà tài trợ, số tiền tài trợ, thời gian tài trợ. Đồng thời, các tổ chức gây quỹ có thể tiếp cận các phân tích về nhà tài trợ để phục vụ cho mục đích phi lợi nhuận của mình, bao gồm: Giới tính, độ tuổi, địa lý.',
  },
  {
    title: 'Tôi có thể chia sẻ Dự án của mình lên Facebook không?',
    desc: 'Bạn hoàn toàn có thể và Mercy Collection khuyến khích bạn chia sẻ và lan tỏa Dự án của mình hoặc của người khác tới bạn bè thông qua Facebook để đạt hiệu quả tuyên truyền hơn, nhiều người tham gia hơn. Biểu tượng chia sẻ được gắn ở mỗi dự án cụ thể.',
  },
];
export { listFaq };
