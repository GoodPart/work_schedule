export default function Index({ handleChangeId, handleChangePw, submit, dataProps }: any) {
    return (
        <>
            <input onChange={(e) => handleChangeId(e)} value={dataProps.userId} />
            <label>아이디</label>

            <input onChange={(e) => handleChangePw(e)} value={dataProps.userPw} />
            <label>비밀번호</label>

            <input type="button" onClick={() => submit()} value="로그인" />

        </>
    )
}