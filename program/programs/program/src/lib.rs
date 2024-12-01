use anchor_lang::prelude::*;

declare_id!("EmxCJ3fwCbbHKTjpP1qSQsGeVCy1abkfEqabsBBnwRCw");

#[program]
pub mod time_capsule {  
    use super::*;

    pub fn create_capsule(
        ctx: Context<CreateCapsule>,
        recipient: Pubkey,
        release_time: i64,
        encrypted_aes_key: String,
        video_cid: String,
    ) -> Result<()> {
        let capsule = &mut ctx.accounts.capsule;
        capsule.creator = *ctx.accounts.creator.key;
        capsule.recipient = recipient;
        capsule.release_time = release_time;
        capsule.encrypted_aes_key = encrypted_aes_key;
        capsule.video_cid = video_cid;
        capsule.created_at = Clock::get()?.unix_timestamp;
        Ok(())
    }

    pub fn access_capsule(ctx: Context<AccessCapsule>) -> Result<()> {
        let capsule = &ctx.accounts.capsule;
        require!(
            *ctx.accounts.requestor.key == capsule.recipient,
            ErrorCode::Unauthorized
        );
        require!(
            Clock::get()?.unix_timestamp >= capsule.release_time,
            ErrorCode::TooEarly
        );
        Ok(())
    }

    pub fn get_capsules_for_wallet(ctx: Context<GetCapsulesForWallet>) -> Result<()> {
        Ok(())
    }
}

#[account]
pub struct Capsule {
    pub creator: Pubkey,
    pub recipient: Pubkey,
    pub release_time: i64,
    pub encrypted_aes_key: String,
    pub video_cid: String,
    pub created_at: i64,
    pub accessed: bool,
}

#[derive(Accounts)]
#[instruction(recipient: Pubkey, release_time: i64)]
pub struct CreateCapsule<'info> {
    #[account(
        init,
        payer = creator,
        space = 8 + 32 + 32 + 8 + 200 + 200 + 8 + 1,
        seeds = [
            b"capsule",
            creator.key().as_ref(),
            recipient.key().as_ref(),
            &release_time.to_le_bytes()[..8]
        ],
        bump
    )]
    pub capsule: Account<'info, Capsule>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AccessCapsule<'info> {
    #[account(mut)]
    pub capsule: Account<'info, Capsule>,
    pub requestor: Signer<'info>,
}

#[derive(Accounts)]
pub struct GetCapsulesForWallet<'info> {
    pub wallet: Signer<'info>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("You are not authorized to access this capsule.")]
    Unauthorized,
    #[msg("It is too early to access this capsule.")]
    TooEarly,
}
