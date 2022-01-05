function Input() {
  return (
    <div className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll`}>
      <img
        src="https://media-exp1.licdn.com/dms/image/D5635AQEyNbzjaS9vpw/profile-framedphoto-shrink_100_100/0/1641261133658?e=1641427200&v=beta&t=Q2BizxXqz07bAzGiayk2wsdeRiOaXeHZRZ_EvCFHVQ8"
        alt=""
        className="h-11 w-11 rounded-full cursor-pointer"
      />

      {/* divide-y: basically creates a line bw each of the child without adding it manually to each div */}
      <div className="w-full divide-y divide-gray-700">
        <div>
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>

        <div>osaujdfh</div>
      </div>
    </div>
  );
}

export default Input;
