export const fullBlockQuery = `{
    block_num
    previous
    timestamp
    transaction_mroot
    action_mroot
    block_mroot
    schedule_version
    new_producers
    producer
    producer_signature
    regions {
        region
        cycles_summary {
            read_locks
            write_locks
            transactions {
                status
                kcpu_usage
                net_usage_words
                id
            }
        }
    } 
    input_transactions {
        signatures
        compression
        data
    }
    id
    ref_block_prefix
}`;