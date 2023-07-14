interface IEmojiProps {
	label?: string;
	symbol: string;
}

/* Proper React way to show Emoji on screen */
const Emoji = ({ label, symbol }: IEmojiProps) => {
	return (
		<span
			className="emoji"
			role="img"
			aria-label={label ? label : ''}
			aria-hidden={label ? 'false' : 'true'}
			style={{ textAlign: 'center', display: 'block' }}
		>
			{symbol}
		</span>
	);
};

export default Emoji;
